-- Full-text search over learn_topics, for the header search bar.
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

-- to_tsvector() is STABLE, not IMMUTABLE (text search dictionaries can be
-- altered), so it can't be used in a `generated always as (...) stored`
-- column. Use a plain column + trigger instead, which is the standard
-- pattern for Postgres full-text search.
alter table public.learn_topics add column search_vector tsvector;

create or replace function public.learn_topics_search_vector_update() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.summary, '')), 'B') ||
    setweight(to_tsvector('english', array_to_string(coalesce(new.tags, '{}'), ' ')), 'C') ||
    setweight(to_tsvector('english', array_to_string(coalesce(new.key_takeaways, '{}'), ' ')), 'C');
  return new;
end;
$$ language plpgsql;

create trigger learn_topics_search_vector_trigger
  before insert or update on public.learn_topics
  for each row execute function public.learn_topics_search_vector_update();

-- Backfill existing rows.
update public.learn_topics set title = title;

create index if not exists idx_learn_topics_search on public.learn_topics using gin (search_vector);
