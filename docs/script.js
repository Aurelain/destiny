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