insert into public.location (address, lat, lon, zip_code)
select distinct address, latitude, longitude, zip_codes 
from food_trucks_raw ftr
where facility_type is not null;

insert into public.facility_type (facility_type_name)
select distinct ftr.facility_type 
from food_trucks_raw ftr
where facility_type is not null;

insert into public.permit (location_id, facility_type_id, vendor_id, start_date, end_date)
select loc.id, ft.id, v.id, TO_DATE(ftr.approved, 'MM/DD/YYYY'), TO_DATE(ftr.expiration_date, 'MM/DD/YYYY')
from food_trucks_raw ftr
left outer join "location" loc on loc.address = ftr.address 
	and loc.zip_code = ftr.zip_codes 
	and loc.lat = ftr.latitude 
	and loc.lon = ftr.longitude 
left outer join facility_type ft on ft.facility_type_name = ftr.facility_type 
left outer join vendor v on v.vendor_name = ftr.applicant 
where facility_type is not null;

insert into schedule (day_name, start_time, end_time, permit_id)
select sch.day, TO_TIMESTAMP(sch.start_time, 'HH12AM')::TIME, TO_TIMESTAMP(sch.end_time, 'HH12AM')::TIME, sch.id 
from (
	select (parse_schedule(ftr.days_hours)).*, p.id
	from food_trucks_raw ftr 
	left outer join "location" loc on loc.address = ftr.address 
		and loc.zip_code = ftr.zip_codes 
		and loc.lat = ftr.latitude 
		and loc.lon = ftr.longitude 
	left outer join facility_type ft on ft.facility_type_name = ftr.facility_type 
	left outer join vendor v on v.vendor_name = ftr.applicant 
	left outer join permit p on v.id = p.vendor_id 
		and ft.id = p.facility_type_id 
		and loc.id = p.location_id 
	where ftr.days_hours is not null) sch;