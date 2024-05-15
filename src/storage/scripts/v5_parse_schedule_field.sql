create or replace function parse_schedule(schedule_string varchar)
returns table(day varchar, start_time varchar, end_time varchar)
as $$
	def parse_schedule(schedule):
		entries = []
		day_ranges = schedule.split(';')
		for day_range in day_ranges:
			days, time_ranges = day_range.split(':')
			days = days.split('/')
			for day in days:
				for time_range in time_ranges.split('/'):
					start_time, end_time = time_range.split('-')
					entries.append((day, start_time, end_time))
		return entries

	def expand_range(start_day, end_day):
	    weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
	    start_index = weekdays.index(start_day)
	    end_index = weekdays.index(end_day)
	    return weekdays[start_index:end_index + 1]

	def print_schedule_table(entries):
	    output_array = []
	    for entry in entries:
	        if '-' in entry[0]:
	            start_day, end_day = entry[0].split('-')
	            for day in expand_range(start_day, end_day):
	                output_array.append((day, entry[1],entry[2]))
	        else:
	            output_array.append((entry[0], entry[1],entry[2]))
	    return output_array

	return print_schedule_table(parse_schedule(schedule_string))

$$ language plpython3u;