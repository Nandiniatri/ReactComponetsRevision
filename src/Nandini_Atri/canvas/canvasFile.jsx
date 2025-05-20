// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const Editor = () => {
//   const [value, setValue] = useState('');

//   useEffect(() => {
//     const savedData = localStorage.getItem('quill-content');
//     if(savedData){
//         setValue(saved);
//     }
//   },[])

//   const handleChange = (content) => {
//     setValue(content);
//     localStorage.setItem('quill-content' , content);
//   }

//   const modules = {
//     toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
//   };

//   return (
//     <div style={{ minHeight: '300px' }}>
//       <ReactQuill
//         value={value}
//         onChange={handleChange}
//         modules={modules}
//         theme="snow"
//         placeholder="Write your note..."
//       />
//     </div>
//   );
// };

// export default Editor;



import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {
  const [value, setValue] = useState('');

  // Get from URL if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('data');
    if (encoded) {
      const decoded = decodeURIComponent(atob(encoded));
      setValue(decoded);
    }
  }, []);

  const handleShare = () => {
    const encoded = btoa(encodeURIComponent(value));
    const shareUrl = `${window.location.origin}?data=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Shareable link copied to clipboard!');
  };

  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }]],
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        theme="snow"
        placeholder="Write your note..."
        style={{ minHeight: '300px' }}
      />
      <button onClick={handleShare} style={{ marginTop: '10px' }}>
        📋 Copy Shareable Link
      </button>
    </div>
  );
};

export default Editor;
