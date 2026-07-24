document.addEventListener('DOMContentLoaded', () => {
  const installCopy = document.querySelector('.Install__copy');
  const installCode = document.querySelector('.Install__code code');

  if (installCopy && installCode) {
    installCopy.addEventListener('click', async () => {
      await navigator.clipboard.writeText(installCode.textContent);
      installCopy.textContent = 'Copied!';
      setTimeout(() => {
        installCopy.textContent = 'Copy';
      }, 1500);
    });
  }

  const modal = document.getElementById('componentModal');
  const modalTitle = modal.querySelector('.Modal__title');
  const modalPreview = modal.querySelector('.Modal__preview');
  const modalCode = modal.querySelector('.Modal__code code');
  const modalCopy = modal.querySelector('.Modal__copy');
  const modalClose = modal.querySelector('.Modal__close');

  function openModal(card) {
    const row = card.querySelector('.ComponentCard__row');
    const code = card.querySelector('.ComponentCard__code');

    modalTitle.textContent = card.dataset.componentName;
    modalPreview.innerHTML = row.innerHTML;
    modalCode.textContent = code.content.textContent.trim();
    modalCopy.textContent = 'Copy';
    modal.showModal();
  }

  document.querySelectorAll('.ComponentCard').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modalClose.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  modalCopy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(modalCode.textContent);
    modalCopy.textContent = 'Copied!';
    setTimeout(() => {
      modalCopy.textContent = 'Copy';
    }, 1500);
  });
});
