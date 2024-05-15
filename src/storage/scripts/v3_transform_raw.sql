CREATE TEMP TABLE split_and_normalized_food_items AS
SELECT
    applicant,
    initcap(
    	trim(both ' ' from 
    		regexp_replace(
	    		unnest(
	    			string_to_array(
	    				translate(
	    					translate(food_items, '&', ':'),
	    				';', ':'), 
	    		':')), 
	    	'[[:punct:]]*$', 
	    ''))) AS normalized_food_item
FROM
    food_trucks_raw;

INSERT INTO public.food_item (food_item_name)
SELECT DISTINCT
    CASE
        WHEN strpos(normalized_food_item, '(') > 0 THEN
            substring(normalized_food_item from 1 for strpos(normalized_food_item, '(') - 1)
        ELSE
            normalized_food_item
    END AS normalized_food_item_split
FROM split_and_normalized_food_items;

INSERT INTO public.vendor (vendor_name)
SELECT DISTINCT ft.applicant 
FROM food_trucks_raw ft;

INSERT INTO public.vendor_food_item(vendor_id, food_item_id)
SELECT v.id as vendor_id, fi.id as food_item_id
FROM (
    SELECT DISTINCT
    CASE
        WHEN strpos(normalized_food_item, '(') > 0 THEN
            substring(normalized_food_item from 1 for strpos(normalized_food_item, '(') - 1)
        ELSE
            normalized_food_item
    END AS normalized_food_item_split,
    applicant
    FROM split_and_normalized_food_items
) sfi
INNER JOIN public.vendor v ON v.vendor_name = sfi.applicant
INNER JOIN public.food_item fi ON fi.food_item_name = sfi.normalized_food_item_split;

DROP TABLE IF EXISTS split_and_normalized_food_items;

