def handlDates(date):
    newDate = str(date).split()
    print(date)
    return newDate[0]

def serialize(data):
    list_of_data = []
    for i in data:
        list_of_data.append({
            "id":i.id,
            "title":i.title,
            "date_posted":handlDates(i.date_posted),
            "content":i.content,
            "urgent":i.urgent,
            "curr_user":i.user_id
        })
    return list_of_data
