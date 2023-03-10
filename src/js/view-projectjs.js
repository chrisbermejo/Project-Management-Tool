async function info() {
    const url = location.href;
    const id = url.substring(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1, url.lastIndexOf('/'));
    const response = await fetch(`/dashboard/projects/project/${id}/view/auditlog`);
    const auditLogs = await response.json();
    const index = auditLogs.length-1;

    // const recentChangesDiv = document.getElementById('recent-changes');
    // for (let i = auditLogs.length-1, j = 0; i > auditLogs.length-4; i--, j++) {
    const changeDiv = document.getElementById('recent-changes');
    const recent_header = document.getElementById('change-header');

    if(index >= 0){
        changeDiv.style.border = "solid black 2px";
        recent_header.textContent = "Recent Changes:"
        const d1 = document.createElement('div');
        d1.textContent = 'User';
        changeDiv.appendChild(d1);
        const d2 = document.createElement('div');
        d2.textContent = 'Timestamp';
        changeDiv.appendChild(d2);
        const d3 = document.createElement('div');
        d3.textContent = 'Context';
        changeDiv.appendChild(d3);
    }
    for (let i = index; i >= 0; i--) {
        let auditlog = auditLogs[i];
        let currentLog = auditlog.updated_fields;

        let user = document.createElement('div');
        user.textContent = auditlog.updated_by;
        console.log(user)
        changeDiv.appendChild(user);

        let timestamp = document.createElement('div');
        timestamp.textContent = auditlog.timestamp;
        changeDiv.appendChild(timestamp);

        const keys = Object.keys(currentLog);
        let newnewDiv = document.createElement('div');
        keys.forEach(key => {
            if (key == "old_projectid") {
                const newDiv = document.createElement('div');
                const p0 = document.createElement('p');
                const p1 = document.createElement('p');
                p0.textContent = 'ProjectID Changed';
                p1.textContent = `${currentLog.old_projectid} → ${currentLog.new_projectid}`;
                newDiv.appendChild(p0);
                newDiv.appendChild(p1);
                newnewDiv.appendChild(newDiv);
            }
            if (key == "old_title") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                p1.textContent = `Title: ${currentLog.old_title} → ${currentLog.new_title}`;
                newDiv.appendChild(p1);
                newnewDiv.appendChild(newDiv);
            }
            if (key == "old_description") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                p1.textContent = 'Description: Check Logs';
                newDiv.appendChild(p1);
                newnewDiv.appendChild(newDiv);
            }
            if (key == "old_status") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                p1.textContent = `Status: ${currentLog.old_status} → ${currentLog.new_status}`;
                newDiv.appendChild(p1);
                newnewDiv.appendChild(newDiv);
            }
            if (key == "old_projectedDate") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                p1.textContent = `Projected Date: ${currentLog.old_projectedDate} → ${currentLog.new_projectedDate}`;
                newDiv.appendChild(p1);
                newnewDiv.appendChild(newDiv);
            }
            changeDiv.appendChild(newnewDiv);
        });        
    };
};

info();