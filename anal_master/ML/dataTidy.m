%% ========== Clear the data from anomalies ==========
% crowdhackathon - DSG 
% raw data contains some noise, and paranormal values (lol, 45k seconds for
% a trip)
 
% If maxSpeed, or avgSpeed, or duration, or idleDuration,
% or score are out of logical ranges, clear em and get index.
indx_to_del = find(commasepavalues(:,3) > 10801 | commasepavalues(:,6) > 10801 | ...    
commasepavalues(:,7) > 170 | commasepavalues(:,8) > 1 | commasepavalues(:,8) <= 0);  

% Sort values asc. Just formal
indx_to_del = sort(indx_to_del);                                                                               
% buffer to keep raw data as well, might need em
buff_matrix = commasepavalues;
buff_matrix(indx_to_del, :) = [];
% clean_data is what we want
clean_data = buff_matrix;				
% remove timestamps as well
startTime(indx_to_del) = [];															
stopTime(indx_to_del) = [];

% to string to search for months  ---------------------
for i = 1:length(startTime)
    start_string(i,1:5) = char(startTime(i));
end
get_months = str2num(start_string(:,4:end));
months_to_scan = unique(get_months);
% ---------------------------------------------------
clean_data(:,end+1) = get_months;
% get drivers ids
driver_ids = unique(clean_data(:,2));
% sort accord. to month
clean_sorted = sortrows(clean_data,size(clean_data,2));

% bundle to cells  ------------------------------------
for i = 1:length(driver_ids)
    driver{i} = clean_sorted(clean_sorted(:,2) == driver_ids(i),:);
end
% ---------------------------------------------------

save cleaned_data.mat

%% ========== Feature Extraction ==========

% score_diff is the diff from accel. scores. Indicates consistency
% dur_ratio is the active driving time
% score is extracted from speeding, braking, acceleration and idling
for i = 1:length(driver_ids) 														
    for j = 1:length(months_to_scan)

        scores(i,j) = mean(driver{i}(driver{i}(:,9) ==	months_to_scan(j),8));
        std_scores(i,j) = std(driver{i}(driver{i}(:,9) ==	months_to_scan(j),8));
        score_diff(i,j) = std(diff(driver{i}(driver{i}(:,9) == months_to_scan(j),8))); 
        dur_ratio(i,j) = (mean(driver{i}(driver{i}(:,9) == months_to_scan(j),3)) - ...
                             mean(driver{i}(driver{i}(:,9) == months_to_scan(j),6)))/  ...
                             mean(driver{i}(driver{i}(:,9) == months_to_scan(j),3));
        range(i,j) = mean((max(driver{i}(driver{i}(:,9) == months_to_scan(j),8)) - ...
                             min(driver{i}(driver{i}(:,9) == months_to_scan(j),8))));            
    end
end
% ---------------------------------------------------
% normalize values for classifier or next level of analysis
normz_diff = mat2gray(score_diff,[0 1]);
normz_score = mat2gray(scores,[0 1]);
normz_ratio = mat2gray(dur_ratio,[0 1]);
normz_std_scores = mat2gray(std_scores,[0 1]);
normz_range = mat2gray(range,[0 1]);
% ---------------------------------------------------
% save the workspace
save cleaned_data_with_features.mat
% % naive but worx
% pad_metadata(24,9) = zeros;
% pad_metadata(end, 1:end-1) = months_to_scan;
% pad_metadata(1:end-1, end) = driver_ids;
% % ikr
% normz_diff(end+1, :) = pad_metadata(end,1:end-1);
% normz_diff(:, end+1) = pad_metadata(:,end);
% normz_score(end+1, :) = pad_metadata(end,1:end-1);
% normz_score(:, end+1) = pad_metadata(:,end);
% normz_ratio(end+1, :) = pad_metadata(end,1:end-1);
% normz_ratio(:, end+1) = pad_metadata(:,end);
% normz_std_scores(end+1, :) = pad_metadata(end,1:end-1);
% normz_std_scores(:, end+1) = pad_metadata(:,end);
% normz_range(end+1, :) = pad_metadata(end,1:end-1);
% normz_range(:, end+1) = pad_metadata(:,end);
% fml but worked, will use matrices on next version
clearvars -except normz_diff normz_score normz_ratio normz_range driver_ids months_to_scan
save __feats_only__.mat

for i = 1:length(driver_ids)
    for j = 1:length(months_to_scan)
        month{j}(i,:) = [normz_diff(i,j) ,normz_range(i,j), normz_ratio(i,j), normz_score(i,j)];
    end
end

final_to_out = [month{1}; month{2}; month{3}; month{4}; month{5}; month{6}; month{7}; month{8}];

k = 1;
for i = 1:23:length(final_to_out)
final_to_out(i:i+23,6) = months_to_scan(k);
k = k+1;
end

save __data__.mat
csvwrite('data_csv.csv',final_to_out)
% .- %
