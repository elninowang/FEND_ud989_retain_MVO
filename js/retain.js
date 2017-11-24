$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                datetime: Date.now(),
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            var newDate = new Date();
            octopus.getNotes().forEach(function(note){
                newDate.setTime(note.datetime);
                var htmlDate = `<span class="note-date">${newDate}</span>`;
                htmlStr += `<li class="note">${htmlDate} ${note.content}</li>`;
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});