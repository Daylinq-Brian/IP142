let notification = {};

notification.waitList = [];
notification.notifications = [];

// loads all notifcations
$(document).ready(async() => {
    notification.box = document.getElementById('notification-box');
    notification.notifications = await notification.loadNotifications();
});

// adds notifications to the waiting list
notification.add = (data) => {
    notification.waitList.push(data);
    if(notification.waitList.length == 1) notification.nextInRow();
}

// shows a notification
notification.show = (data) => {
    notification.box.innerHTML = notification.notifications[data.type].replaceAll('__DATA__', data.data);
    notification.box.style.display = 'block';

    setTimeout(notification.hide, 3000);
}

// gets the next notification in row
notification.nextInRow = () => {
    notification.show(notification.waitList[0]);
}

// hides the current notification and calls for the next one if applicable
notification.hide = () => {
    notification.box.innerHTML = '';
    notification.box.style.display = 'none';
    notification.waitList.shift();

    if(notification.waitList.length > 0){
        setTimeout(notification.nextInRow, 300);
    }
}

notification.loadNotifications = () => {
    return new Promise(resolve => {
        $.ajax({
            url: 'dependencies/notifications.json',
            success: function (data){
                resolve(data);
            }
        });
    });
}