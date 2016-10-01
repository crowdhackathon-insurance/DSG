import csv
import json

with open('data_formatted.json') as data_file:    
    raw_data = json.load(data_file)

csv_data = csv.writer(open("comma_sepa_values.csv", "wb+"))
csv_data.writerow(["id", "vehicleID", "duration", "maxSpeed", "distance", "idleDuration", 
				"avgSpeed", "score", "startTime", "stopTime"])

for raw_data in raw_data:
    csv_data.writerow([raw_data["id"],
                raw_data["vehicleID"],
                raw_data["duration"],
                raw_data["maxSpeed"],
                raw_data["distance"],
                raw_data["idleDuration"],
                raw_data["avgSpeed"],
                raw_data["score"],
                raw_data["startTime"],
                raw_data["stopTime"]])
