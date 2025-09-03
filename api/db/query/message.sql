-- name: CreateMetric :one
INSERT INTO metric (search_term,count,poster_url,movie_id,title)
VALUES ($1,$2,$3,$4,$5)
RETURNING id;

-- name: UpdateMetric :exec
UPDATE metric SET count = count + 1
WHERE id = $1;

-- name: GetMetricByTitle :one
SELECT * FROM metric WHERE title = $1;

-- name: GetAllMetric :many
SELECT search_term,movie_id,title,count,poster_url FROM metric
ORDER BY count DESC
LIMIT 5;