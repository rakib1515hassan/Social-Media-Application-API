# Generated by Django 4.2.4 on 2023-08-29 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AddressType',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('a_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Division',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Sub_Division',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=50)),
                ('division', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_division', to='Profile.division')),
            ],
        ),
        migrations.CreateModel(
            name='User_Working_Assets',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=250, null=True)),
                ('description', models.CharField(blank=True, max_length=500, null=True)),
                ('git_link', models.URLField(blank=True, null=True)),
                ('website_link', models.URLField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_working_assets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_Social_Link',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('websit', models.URLField(blank=True, null=True)),
                ('git', models.URLField(blank=True, null=True)),
                ('linkedIn', models.URLField(blank=True, null=True)),
                ('facebook', models.URLField(blank=True, null=True)),
                ('twitter', models.URLField(blank=True, null=True)),
                ('instagram', models.URLField(blank=True, null=True)),
                ('youtube', models.URLField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_social_link', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_Educationl_Info',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(blank=True, max_length=250, null=True)),
                ('institution_name', models.CharField(blank=True, max_length=250, null=True)),
                ('passing_year', models.DateField(blank=True, null=True)),
                ('result', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_educationl_info', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_Address',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('zip_code', models.CharField(blank=True, max_length=12, null=True)),
                ('cityANDstreet', models.CharField(blank=True, max_length=1024, null=True)),
                ('address_type', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='addresstype', to='Profile.addresstype', verbose_name='AddressType')),
                ('sub_division', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sub_division', to='Profile.sub_division', verbose_name='Sub_Division')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_address', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
