Dropzone.options.dropzoneUpload = {
    acceptedFiles: 'image/*',
    maxFiles: 1,
    init: function () {
        this.on('success', function (file) {
            const btn = document.getElementById('get-result');
            btn.removeAttribute('disabled');
            document.getElementById('get-result').addEventListener('click', function (e) {
                btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                btn.setAttribute('disabled', '');
                fetch(`${location.origin}/process/${file.name}`, {
                    method: 'POST'
                })
                    .then(response => response.json())
                    .then(data => {
                        btn.innerHTML = 'Get Result';
                        btn.removeAttribute('disabled');
                        location.href = location.origin + '/' + data.result;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
        });
    }
};