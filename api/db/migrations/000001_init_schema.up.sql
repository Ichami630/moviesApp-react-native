CREATE TABLE metric (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
  search_term VARCHAR(1024) NOT NULL,
  count INTEGER DEFAULT 0 NOT NULL,
  poster_url VARCHAR(1024) NOT NULL,
  movie_id VARCHAR(1024) NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
