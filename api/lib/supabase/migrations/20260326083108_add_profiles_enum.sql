CREATE TYPE user_type AS ENUM ('author', 'normal');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    user_type user_type
);

