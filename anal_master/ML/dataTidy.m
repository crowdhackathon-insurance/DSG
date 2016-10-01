%% ========== Clear the data from anomalies ==========
% raw data contains some noise, and paranormal values (lol, 45k seconds for
% a trip)
 
indx_to_del = find(commasepavalues(:,3) > 10801 | commasepavalues(:,6) > 10801 | ...%if maxSpeed, or avgSpeed, or duration, or idleDuration,
commasepavalues(:,7) > 170 | commasepavalues(:,8) > 1 | commasepavalues(:,8) <= 0);% or score are out of logical ranges, clear em and get index.

indx_to_del = sort(indx_to_del);% Sort values asc. Just formal
buff_matrix = commasepavalues;% buffer to keep raw data as well, might need em
buff_matrix(indx_to_del, :) = [];
clean_data = buff_matrix;% clean_data is what we want

startTime(indx_to_del) = [];% remove timestamps as well
stopTime(indx_to_del) = []; % remove timestamps as well

save cleaned_data.mat%save the workspace

for i = 1:length(startTime)
start_string(i,1:5) = char(startTime(i));
end
get_months = str2num(start_string(:,4:end));
months_to_scan = unique(get_months);

%% create driver cells




get_indices = unique(clean_data(:,2)); % get unique drivers
for i = 1:length(get_indices) % for length of unique drivers
    driver{i} = clean_data(clean_data(:,2) == get_indices(i),3:end);
    mean_values(i,:) = mean(driver{i}(:,1:end));
    lengths(i) = length(driver{i});
end

mean_for_models = mean(mean_values);
mean_trip_no = round(mean(lengths));
percentage_over_mean = (mean_for_models/100)

