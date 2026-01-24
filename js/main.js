

console.log("Intelligence of Shandar Loaded");
<script src="https://accounts.google.com/gsi/client"></script>
<script>
const CLIENT_ID = "1099409130744-rc4oti4bbk8hsdo9oiu80ldhbfr837uj.apps.googleusercontent.com";
const FOLDER_ID = "1GtCeRBo9-Pfppbq-jy2Mfrj-_29cKsoM?usp=sharing";
let accessToken = null;

function initAuth() {
  google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      uploadFile();
    },
  }).requestAccessToken();
}

function uploadToDrive() {
  if (!accessToken) {
    initAuth();
    return;
  }

  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("File select karo");
    return;
  }

  const metadata = {
    name: file.name,
    parents: [FOLDER_ID]
  };

  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", file);

  fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    body: form
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("status").innerText = "Upload successful";
  })
  .catch(() => {
    document.getElementById("status").innerText = "Upload failed";
  });
}
</script>

