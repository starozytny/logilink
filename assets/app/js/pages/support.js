import "../../css/pages/support.scss"

storage();

function storage () {
    let directories = document.querySelectorAll('.support-storage-directory');
    let files = document.querySelectorAll('.support-storage-files');
    if(directories){
        directories.forEach(directory => {
            directory.addEventListener('click', () => {
                let isActive = directory.classList.contains('active');

                directories.forEach(dir => {
                    dir.classList.remove('active');
                })
                files.forEach(fil => {
                    fil.classList.remove('active');
                })

                if(!isActive){
                    directory.classList.add('active');

                    let directoryFiles = document.querySelector('.support-storage-files-' + directory.dataset.id)
                    if(directoryFiles){
                        directoryFiles.classList.add('active');
                    }
                }
            })
        })
    }
}
