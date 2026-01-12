
import React from 'react';
import { X } from 'lucide-react';
import { BIBLE_BOOKS } from '../../constants';

interface BookSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBookIndex: number;
  onSelectBook: (index: number) => void;
  onSelectChapter: (chapter: number) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({ 
  isOpen, 
  onClose, 
  selectedBookIndex, 
  onSelectBook, 
  onSelectChapter 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex justify-end animate-fade-in">
       <div className="w-full md:w-[400px] bg-paper dark:bg-stone-900 h-full shadow-2xl flex flex-col animate-slide-up relative">
          <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-surface dark:bg-stone-900 flex justify-between items-center z-10 shadow-sm">
             <div>
                <h3 className="font-serif font-bold text-xl text-ink dark:text-white">Índice Bíblico</h3>
                <p className="text-xs text-subtle">Selecione um livro para navegar</p>
             </div>
             <button onClick={onClose} className="p-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-full transition-colors">
                <X size={20} className="text-ink dark:text-white"/>
             </button>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-2">
             {BIBLE_BOOKS.map((book, idx) => (
               <button 
                 key={book.name} 
                 onClick={() => { 
                    onSelectBook(idx); 
                    onSelectChapter(1); 
                 }} 
                 className={`w-full text-left px-5 py-4 rounded-2xl flex justify-between items-center transition-all ${selectedBookIndex === idx ? 'bg-ink dark:bg-white text-white dark:text-ink shadow-md' : 'bg-surface dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700'}`}
               >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${selectedBookIndex === idx ? 'bg-gold text-ink' : 'bg-stone-100 dark:bg-stone-900 text-subtle'}`}>
                        {book.abbrev.toUpperCase()}
                    </div>
                    <span className="font-bold font-serif">{book.name}</span>
                  </div>
                  <span className={`text-xs font-medium ${selectedBookIndex === idx ? 'text-white/80 dark:text-black/60' : 'text-subtle'}`}>
                    {book.chapters} caps
                  </span>
               </button>
             ))}
          </div>
       </div>
    </div>
  );
};

export default BookSelector;
