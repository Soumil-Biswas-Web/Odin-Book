import React, { Children, useState } from 'react'

export default function ModalWindow({ buttonText, children }) {

    const [showModal, setShowModal] = useState(false);

  return (
    <div className=''>
        <button
            className='button-style'
            onClick={() => setShowModal(true)}
        >
            {buttonText}
        </button>

        {showModal && 
            <div className="fixed inset-0 bg-black/50 magic-center justify-center z-10"
            
            >
                <button 
                    className='absolute bg-transparent w-full h-full z-[-1]'
                    onClick={() => setShowModal(false)}
                ></button>
                {children}
            </div>
        }
    </div>
  )
}
