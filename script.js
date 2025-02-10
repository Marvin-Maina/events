
const events = [
    {
        title: 'Team Meeting',
        date: new Date(),
        location: 'Office',
        attendees: new Set(['Alice', 'Bob'])
    },
    {
        title: 'Webinar',
        date: new Date(Date.now() + 2 * 86400000), // 2 days from now
        location: 'Online',
        attendees: new Set(['Charlie', 'Dave'])
    },
    {
        title: 'Conference',
        date: new Date(Date.now() + 8 * 86400000), // 8 days from now
        location: 'Convention Center',
        attendees: new Set(['Eve', 'Frank', 'Grace'])
    }
];


const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 86400000);

const upcomingEvents = events
    .filter(event => event.date >= today && event.date <= nextWeek)
    .map(({ title, date, location }) => ({
        title,
        date: date.toDateString(),
        location
    }));

console.log('Upcoming events in the next 7 days:');
console.table(upcomingEvents);


const organizers = new WeakMap();
events.forEach(event => {
    organizers.set(event, `${event.title} Organizer`);
});


const eventTable = events.map(({ title, date, location }) => ({
    title,
    date: date.toDateString(),
    location
}));
console.log('All events:');
console.table(eventTable);


function addAttendee(eventTitle, attendee) {
    const event = events.find(e => e.title === eventTitle);
    if (event) event.attendees.add(attendee);
}


events.forEach(event => {
    event.toJSON = function() {
        return {
            ...this,
            formattedDate: `${(this.date.getMonth() + 1).toString().padStart(2, '0')}/${this.date.getDate().toString().padStart(2, '0')}/${this.date.getFullYear()}`,
            attendees: Array.from(this.attendees)
        };
    };
});

function convertToJSON() {
    return JSON.stringify(events, null, 2);
}


const firstEvent = events[0];
console.log('Object methods demonstration:');
console.log('Keys:', Object.keys(firstEvent));
console.log('Values:', Object.values(firstEvent));
console.log('Entries:', Object.entries(firstEvent));

console.log('All events:');
events.forEach(event => 
    console.log(`${event.title} - ${event.date.toDateString()}`)
);


function deleteEvent(eventTitle) {
    const index = events.findIndex(e => e.title === eventTitle);
    if (index !== -1) events.splice(index, 1);
}


function findMostPopularEvent() {
    return events.reduce((maxEvent, current) => 
        current.attendees.size > maxEvent.attendees.size ? current : maxEvent
    );
}

addAttendee('Team Meeting', 'Helen');
console.log('Team Meeting attendees:', [...events[0].attendees]);

console.log('JSON output:');
console.log(convertToJSON());

deleteEvent('Conference');
console.log('After deleting Conference:', events);

const popularEvent = findMostPopularEvent();
console.log('Event with most attendees:', popularEvent.title);