async function info() {
    const response = await fetch(`/dashboard/projects/project/1/view/auditlog`);
    const auditLogs = await response.json();

    // const recentChangesDiv = document.getElementById('recent-changes');
    const change = [document.getElementById('change-one'),document.getElementById('change-two'),document.getElementById('change-three')];

    // for (let i = auditLogs.length-1, j = 0; i > auditLogs.length-4; i--, j++) {
    for (let i = auditLogs.length-3, j = 0; i < auditLogs.length; i++, j++) {
        let auditlog = auditLogs[i];
        let currentLog = auditlog.updated_fields;
        const changeDiv = change[j];
        const user = document.createElement('div');
        user.textContent = `Change made by: ${auditlog.updated_by}`;
        changeDiv.appendChild(user);
        const keys = Object.keys(currentLog);
        keys.forEach(key => {
            if (key == "old_projectid") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                newDiv.textContent = 'ProjectID Changed';
                p1.textContent = `${currentLog.old_projectid} -> ${currentLog.new_projectid}`;
                newDiv.appendChild(p1);
                changeDiv.appendChild(newDiv);
            }
            if (key == "old_title") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                newDiv.textContent = 'Title Changed';
                p1.textContent = `${currentLog.old_title} -> ${currentLog.new_title}`;
                newDiv.appendChild(p1);
                changeDiv.appendChild(newDiv);
            }
            if (key == "old_description") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                newDiv.textContent = 'Description Changed';
                p1.textContent = 'Check Logs';
                newDiv.appendChild(p1);
                changeDiv.appendChild(newDiv);
            }
            if (key == "old_status") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                newDiv.textContent = 'Status Changed';
                p1.textContent = `${currentLog.old_status} -> ${currentLog.new_status}`;
                newDiv.appendChild(p1);
                changeDiv.appendChild(newDiv);
            }
            if (key == "old_projectedDate") {
                const newDiv = document.createElement('div');
                const p1 = document.createElement('p');
                newDiv.textContent = 'Projected Date Changed';
                p1.textContent = `${currentLog.old_projectedDate} -> ${currentLog.new_projectedDate}`;
                newDiv.appendChild(p1);
                changeDiv.appendChild(newDiv);
            }
        });        
    };
};

info();