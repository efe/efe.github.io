---
title: "Nullable but not null"
publishedAt: '2025-07-25'
category: 'django'
isFeatured: true
hackernews_item_id: 44684168
---

When working on backend applications, especially those with evolving database schemas, it's common to see a recurring pattern:

1. A new field is added to a model.
2. To avoid locking the table during the migration, the field is added as **nullable**.
3. The application logic is updated to start filling in this field.
4. A backfill job runs to populate the existing records.
5. The field is left as nullable.

People often forget the final step which is updating the schema to make the field non-nullable once the data is fully populated.

### Why it matters

Leaving a field marked as nullable when it no longer contains nulls creates a mismatch between your schema and your actual data. This can lead to confusion, missed constraints and unnecessary complexity in your code. Over time, your schema becomes harder to trust. If a field is supposed to be required, your database should enforce it.

This happens because marking a field as non-nullable in production often requires care. Teams delay or skip it to avoid risk and the field stays nullable indefinitely. But a field that is **nullable in the schema** and **never null in practice is a silent lie**. This is a missed opportunity to make your data model clearer and safer.

### How to fix it?

To help find these fields, I wrote a simple script that checks all models in a project. It scans for nullable fields and calculates how many rows actually contain null values. The idea is to identify cases where the field could safely be changed to non-nullable.

Here’s the code (written for Django, but the logic can be adapted to any ORM or raw SQL setup):

```python
from django.apps import apps
from django.db import connection, transaction

def get_nullable_fields(model):
    nullable_fields = []
    for field in model._meta.fields:
        if getattr(field, 'null', False) and not field.auto_created:
            nullable_fields.append(field.name)
    return nullable_fields

def get_null_percentage_for_field(model, field_name, total_rows):
    if total_rows == 0:
        return 0.0
    null_count = model.objects.filter(**{f"{field_name}__isnull": True}).count()
    return round((null_count / total_rows) * 100, 2)

def analyze_all_models_fields_nulls_with_timeout(timeout_ms=5000):
    """
    Analyze every nullable field in every model with a DB-level timeout in ms.
    """
    results = []

    for model in apps.get_models():
        model_label = f"{model._meta.app_label}.{model.__name__}"

        with connection.cursor() as cursor:
            cursor.execute(f"SET LOCAL statement_timeout = {timeout_ms};")
            with transaction.atomic():
                nullable_fields = get_nullable_fields(model)
                total_rows = model.objects.count()

                if total_rows == 0:
                    continue

                for field in nullable_fields:
                    null_percent = get_null_percentage_for_field(model, field, total_rows)
                    results.append({
                        "model": model_label,
                        "field": field,
                        "null_percentage": null_percent,
                    })
    return results
```

### How to use it?

You can integrate this logic into a command-line tool, admin report, or health check. The output shows each nullable field and what percentage of rows actually contain nulls.

If a field has **0.0%** nulls, that’s a strong signal it should no longer be nullable. That change makes your schema more accurate, improves validation, and simplifies your codebase.

```json
[
    {
        "model": "users.Profile",
        "field": "birth_date",
        "null_percentage": 0.0
    },
    {
        "model": "orders.Order",
        "field": "coupon_code",
        "null_percentage": 92.4
    },
    {
        "model": "products.Product",
        "field": "description",
        "null_percentage": 0.0
    }
]
```

### Final thoughts

Nullable fields that never hold nulls are often the result of incomplete migrations or forgotten cleanup steps. Catching and fixing them keeps your data model honest and your application healthier.

If a field is meant to be required, your database should say so. Nullable but not null? Time to clean that up.