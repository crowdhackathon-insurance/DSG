%% ========== Clear the data from anomalies ==========
% crowdhackathon - DSG 
% raw data contains some noise, and paranormal values (lol, 45k seconds for
% a trip)
 
indx_to_del = find(commasepavalues(:,3) > 10801 | commasepavalues(:,6) > 10801 | ...	% If maxSpeed, or avgSpeed, or duration, or idleDuration,
commasepavalues(:,7) > 170 | commasepavalues(:,8) > 1 | commasepavalues(:,8) <= 0); 	% or score are out of logical ranges, clear em and get index.

indx_to_del = sort(indx_to_del);														% Sort values asc. Just formal
buff_matrix = commasepavalues;															% buffer to keep raw data as well, might need em
buff_matrix(indx_to_del, :) = [];
clean_data = buff_matrix;																% clean_data is what we want

startTime(indx_to_del) = [];															% remove timestamps as well
stopTime(indx_to_del) = [];

for i = 1:length(startTime)
    start_string(i,1:5) = char(startTime(i));
end

get_months = str2num(start_string(:,4:end));
months_to_scan = unique(get_months);
clean_data(:,end+1) = get_months;

driver_ids = unique(clean_data(:,2));													% get drivers ids
clean_sorted = sortrows(clean_data,size(clean_data,2));									% sort accord. to month

for i = 1:length(driver_ids)
    driver{i} = clean_sorted(clean_sorted(:,2) == driver_ids(i),:);						% bundle to cells
end

save cleaned_data.mat

%% ========== Feature Extraction ==========

for i = 1:length(driver_ids)	 														% score_diff is the diff from accel. scores. Indicates consistency
    for j = 1:length(months_to_scan) 													% dur_ratio is the active driving time

        score_diff(i,j) = std(diff(driver{i}(find(driver{i}(:,9) == months_to_scan(j)),8))); 
        dur_ratio(i,j) = (mean(driver{i}(find(driver{i}(:,9) == months_to_scan(j)),3)) - ...
                             mean(driver{i}(find(driver{i}(:,9) == months_to_scan(j)),6)))/  ...
                             mean(driver{i}(find(driver{i}(:,9) == months_to_scan(j)),3));

    end
end

save cleaned_data_with_features.mat 													% save the workspace

