async function info() {
    const response = await fetch(`/dashboard/projects/project/1/view/auditlog`);
    const auditLogs = await response.json();

    auditLogs.forEach(element => {
        console.log(element)
    });
}

info()
