export function signOut(e: any) {
    e.preventDefault();
    console.log("signing out");
    try {
        // below is the microsoft logout if we want to restore it
        // await instance.logoutRedirect();
        window.localStorage.clear();
        window.sessionStorage.clear();
        location.reload();
    } catch (e) {
        console.error(e);
    }
}
