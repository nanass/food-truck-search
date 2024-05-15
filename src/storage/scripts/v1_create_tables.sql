CREATE TABLE IF NOT EXISTS public.food_trucks_raw (
    location_id BIGINT,
    applicant VARCHAR(255),
    facility_type VARCHAR(50),
    cnn BIGINT,
    location_description VARCHAR(255),
    address VARCHAR(255),
    block_lot VARCHAR(50),
    block VARCHAR(50),
    lot VARCHAR(50),
    permit VARCHAR(50),
    status VARCHAR(50),
    food_items TEXT,
    x DOUBLE PRECISION,
    y DOUBLE PRECISION,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    schedule VARCHAR(255),
    days_hours VARCHAR(255),
    noi_sent VARCHAR(255),
    approved VARCHAR(255),
    received VARCHAR(255),
    prior_permit VARCHAR(255),
    expiration_date VARCHAR(255),
    location VARCHAR(255),
    fire_prevention_districts BIGINT,
    police_districts BIGINT,
    supervisor_districts BIGINT,
    zip_codes VARCHAR(10),
    neighborhoods_old BIGINT
);

CREATE TABLE IF NOT EXISTS public.vendor (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    vendor_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.facility_type (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    facility_type_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.location (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    address VARCHAR(255),
    zip_code VARCHAR(10),
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.permit (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    location_id BIGINT,
    vendor_id BIGINT,
    facility_type_id BIGINT,
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (id),
    CONSTRAINT permit_location_id_fk 
        FOREIGN KEY (location_id)
        REFERENCES public.location (id)
        ON DELETE CASCADE,
    CONSTRAINT permit_vendor_id_fk 
        FOREIGN KEY (vendor_id)
        REFERENCES public.vendor (id)
        ON DELETE CASCADE,
    CONSTRAINT permit_facility_type_id_fk 
        FOREIGN KEY (facility_type_id)
        REFERENCES public.facility_type (id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.schedule (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    permit_id BIGINT,
    day_ord BIGINT,
    day_name VARCHAR(10),
    start_time TIME,
    end_time TIME,
    PRIMARY KEY (id),
    CONSTRAINT schedule_permit_id_fk 
        FOREIGN KEY (permit_id)
        REFERENCES public.permit (id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.food_item (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    food_item_name VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vendor_food_item (
    id BIGINT NOT NULL UNIQUE GENERATED ALWAYS AS IDENTITY,
    vendor_id BIGINT,
    food_item_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT vendor_food_item_vendor_id_fk
        FOREIGN KEY (vendor_id)
        REFERENCES public.vendor (id)
        ON DELETE CASCADE,
    CONSTRAINT vendor_food_item_food_item_id_fk
        FOREIGN KEY (food_item_id)
        REFERENCES public.food_item (id)
        ON DELETE CASCADE
);