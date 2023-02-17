import random
import json


def changer(num):
    # add leading zeros if the length of the input is less than 5
    num_str = "{:0>5}".format(num)
    # insert a colon after the second character
    num_str = num_str[:2] + "." + num_str[2:]

    return num_str


entity_listings = ["Horror", "comedy", "action",
                   "thriller", "romance", "Documentary"]
intent_listing = ["get_actor", "get_genre",
                  "get_plot", "get_movie", "get_release_year"]

words = [
    "a", "about", "all", "also", "and", "as", "at", "be", "because", "but", "by", "can", "come", "could", "day", "do", "even", "find", "first", "for", "from", "get", "give", "go", "have", "he", "her", "here", "him", "his", "how", "I", "if", "in", "into", "it", "its", "just", "know", "like", "look", "make", "man"]

query_list = []
days_of_the_week = ["Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday", "Sunday"]


# daily_template = {"day": "", "queries": 0, "daily_queries": []}
# hourly_template = {"hour": 0, "data": None}
# data_template = {"intents": [], "entities": [],
#                  "actual_message": "", "response_message": ""}


for day in days_of_the_week:
    query_counter = 0
    daily_list = []
    hours_of_the_day = ["{:0>2}".format(x) for x in range(24)]
    for t in hours_of_the_day:
        # generate a random number

        queries_this_hour = random.randint(1, 50)
        query_counter += queries_this_hour

        temp_list = []

        query_timings = random.sample(range(0, 59999), queries_this_hour)
        query_timings.sort()
        query_timings = [changer(x) for x in query_timings]

        for q in query_timings:

            no_of_entity = random.randint(1, len(entity_listings) - 1)
            entities_selected = random.sample(entity_listings, no_of_entity)
            intent_selected = random.sample(intent_listing, 1)

            data_template = {"exact_time": f"{t}:{q}", "intents": intent_selected, "entities": entities_selected,
                             "actual_message": " ".join(random.sample(words, 10)), "response_message":  " ".join(random.sample(words, 15))}
            temp_list.append(data_template)

        hourly_template = {"hour": f"{t}:00-{t}:59.999",
                           "queries": queries_this_hour, "data": temp_list}
        daily_list.append(hourly_template)

    daily_template = {"day": day, "queries": query_counter,
                      "daily_queries": daily_list}
    query_list.append(daily_template)


json_object = json.dumps(query_list, indent=2)

print(len(query_list))
with open("./output.json", "w") as outfile:
    outfile.write(json_object)
print("done")
