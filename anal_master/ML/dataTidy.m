%% ========== Clear the data from anomalies ==========
% raw data contains some noise, and paranormal values (lol, 45k seconds for
% a trip)
 
indx_to_del = find(csv_data(:,3) > 10801 | csv_data(:,6) > 10801 | ...%if maxSpeed, or avgSpeed, or duration, or idleDuration,
csv_data(:,7) > 170 | csv_data(:,8) > 1 | csv_data(:,8) <= 0);% or score are out of logical ranges, clear em and get index.

indx_to_del = sort(indx_to_del);% Sort values asc. Just formal
buff_matrix = csv_data;% buffer to keep raw data as well, might need em
buff_matrix(indx_to_del, :) = [];
clean_data = buff_matrix;% clean_data is what we want

startTime(indx_to_del) = [];
stopTime(indx_to_del) = [];

save clean_data.mat%save the workspace
