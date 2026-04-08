CREATE TYPE plan_type AS ENUM ('monthly', 'yearly');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'incomplete');

CREATE TABLE subscription (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    subscription_status subscription_status,
    plan_type plan_type,
    created_at TIMESTAMP DEFAULT NOW(),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT
);