/*const CLIENT_ID = '646896866666-glofonuc96hi69gr47qas672qgpb6np8.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDTJ-1K8L8impKVBdaH-N8IIBOx8B6qRi8';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        document.getElementById('authorize-button').onclick = handleAuthClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        listUpcomingEvents();
        document.getElementById('authorize-button').style.display = 'none';
    } else {
        document.getElementById('authorize-button').style.display = 'block';
    }
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(response => {
        const events = response.result.items;
        const eventsDiv = document.getElementById('calendar-events');
        eventsDiv.innerHTML = '';

        if (events.length > 0) {
            for (const event of events) {
                const eventDiv = document.createElement('div');
                eventDiv.innerHTML = `<strong>${event.summary}</strong> - ${event.start.dateTime}`;
                eventsDiv.appendChild(eventDiv);
            }
        } else {
            eventsDiv.innerHTML = 'No upcoming events found.';
        }
    });
}
*/
window.addEventListener('load', ()=>{
    console.log('da');
    const client = google.accounts.oauth2.initTokenClient({
        client_id: '646896866666-glofonuc96hi69gr47qas672qgpb6np8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar',
        callback: (response) => {
            console.log('response:', response);
        },
    });
    client.requestAccessToken();
})