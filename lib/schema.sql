alter table yolanda_gomez.users
add column if not exists contrasena text not null;

create extension if not exists "uuid-ossp";

create schema if not exists yolanda_gomez;
set search_path to yolanda_gomez;

create table if not exists users (
  id uuid primary key,
  name text not null,
  email text unique not null,
  contrasena text not null,
  created_at timestamp with time zone default now()
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'yolanda_gomez'
      and table_name = 'users'
      and column_name = 'password_hash'
  ) then
    alter table yolanda_gomez.users add column if not exists contrasena text;
    execute 'update yolanda_gomez.users set contrasena = password_hash where contrasena is null';
    alter table yolanda_gomez.users drop column if exists password_hash;
  end if;
end $$;

create table if not exists sessions (
  id uuid primary key,
  user_id uuid references users (id) on delete cascade,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);
