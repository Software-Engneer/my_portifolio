import React from 'react';
import './ImageModal.css';

const ImageModal = ({ isOpen, onClose, imageUrl, imageAlt, onPrevious, onNext, hasPrevious, hasNext }) => {
  console.log('ImageModal props:', { isOpen, imageUrl, imageAlt });
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && hasPrevious) {
      onPrevious();
    } else if (e.key === 'ArrowRight' && hasNext) {
      onNext();
    }
  }, [onClose, hasPrevious, hasNext, onPrevious, onNext]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    console.log('ImageModal: Not rendering because isOpen is false');
    return null;
  }

  console.log('ImageModal: Rendering modal with imageUrl:', imageUrl);
  
  return (
    <div 
      className="image-modal-backdrop" 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <div className="image-modal-container">
        <button className="image-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        
        {hasPrevious && (
          <button className="image-modal-nav image-modal-prev" onClick={onPrevious} aria-label="Previous image">
            &#8249;
          </button>
        )}
        
        {hasNext && (
          <button className="image-modal-nav image-modal-next" onClick={onNext} aria-label="Next image">
            &#8250;
          </button>
        )}
        
        <div className="image-modal-content">
          <img 
            src={imageUrl} 
            alt={imageAlt || 'Full size image'} 
            className="image-modal-image"
            style={{
              maxWidth: '100%',
              maxHeight: '95vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzJjM2U1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBsb2FkIGVycm9yPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 