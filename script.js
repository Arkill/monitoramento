document.addEventListener('DOMContentLoaded', function() {
    function toggleSettingsDropdown() {
        var dropdown = document.getElementById("settings-dropdown-menu");
        dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
    }

    // Fechar o dropdown se clicar fora dele
    document.addEventListener("click", function(event) {
        var dropdown = document.getElementById("settings-dropdown-menu");
        var button = document.querySelector(".btn-group button");
        if (!dropdown.contains(event.target) && !button.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
});


// Função para ativar selecionados
function activateSelected() {
    var selectedCheckboxes = document.querySelectorAll('.checkbox-select:checked');
    selectedCheckboxes.forEach(function(checkbox) {
        var row = checkbox.closest('tr');
        row.querySelector('span').classList.replace('label-danger', 'label-success');
        row.querySelector('span').textContent = 'Ativo';
    });
}

// Função para desativar selecionados
function deactivateSelected() {
    var selectedCheckboxes = document.querySelectorAll('.checkbox-select:checked');
    selectedCheckboxes.forEach(function(checkbox) {
        var row = checkbox.closest('tr');
        row.querySelector('span').classList.replace('label-success', 'label-danger');
        row.querySelector('span').textContent = 'Inativo';
    });
}

// Função para excluir selecionados
function deleteSelected() {
    var selectedCheckboxes = document.querySelectorAll('.checkbox-select:checked');
    selectedCheckboxes.forEach(function(checkbox) {
        var row = checkbox.closest('tr');
        row.remove();
    });
}


