# Generated by Django 4.2.4 on 2023-08-28 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_rename_portfolio_user_social_link_websit_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user_social_link',
            old_name='LinkedIn',
            new_name='linkedIn',
        ),
    ]
