// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { Main } from './Main';
// import { MainPropsType } from '../../App/App.types';
// import { CatalogType, NoteType } from '../../types/main.types';

// // Mocking dependencies
// jest.mock('react-router-dom', () => ({
//     NavLink: jest.fn(({ children, ...rest }) => <a {...rest}>{children}</a>)
// }));

// const mockCatalogs: CatalogType[] = [
//     { id: 1, name: 'Catalog 1', updatedAt: '2024-04-02', userId: 123 },
//     { id: 1, name: 'Catalog 1', updatedAt: '2024-04-02', userId: 321 },
// ];

// const mockNotesForShow: NoteType[] = [
//     { id: 1, header: 'Note 1', body: 'Body 1', date: '2024-04-01', lastDate: new Date() },
//     { id: 2, header: 'Note 2', body: 'Body 2', date: '2024-04-02', lastDate: new Date() },
// ];

// const mockGetAllNotes = jest.fn();
// const mockGetAllCatalogs = jest.fn();
// const mockGetNotesByCatalog = jest.fn();
// const mockSortNotes = jest.fn();
// const mockDeleteNote = jest.fn();
// const mockLogOut = jest.fn();
// const mockDeleteAccount = jest.fn();

// const mockProps: MainPropsType = {
//     getNote: jest.fn(id => {
//         return mockNotesForShow.find(note => note.id === id) || null;
//     }),
//     catalogs: mockCatalogs,
//     currentCatalog: mockCatalogs[0],
//     notesForShow: mockNotesForShow,
//     getAllNotes: mockGetAllNotes,
//     getAllCatalogs: mockGetAllCatalogs,
//     getNotesByCatalog: mockGetNotesByCatalog,
//     sortNotes: mockSortNotes,
//     deleteNote: mockDeleteNote,
//     logOut: mockLogOut,
//     deleteAccount: mockDeleteAccount
// };

// describe('Main component', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('renders without crashing', () => {
//         render(<Main {...mockProps} />);
//     });

//     it('calls getAllNotes on mount', () => {
//         render(<Main {...mockProps} />);
//         expect(mockGetAllNotes).toHaveBeenCalledTimes(1);
//     });

//     it('calls sortNotes after timeout when typing in search input', () => {
//         jest.useFakeTimers(); // Используем фиктивные таймеры
    
//         const { getByPlaceholderText } = render(<Main {...mockProps} />);
//         const searchInput = getByPlaceholderText('Enter the header of the note') as HTMLInputElement;
    
//         fireEvent.change(searchInput, { target: { value: 'search query' } });
    
//         // Продвигаем таймер на 1000 мс
//         jest.advanceTimersByTime(1000);
    
//         // Проверяем, что функция sortNotes была вызвана
//         expect(mockSortNotes).toHaveBeenCalledWith('search query');
    
//         jest.useRealTimers(); // Возвращаемся к реальным таймерам
//       });

//     it('calls getAllNotes when clicking show more button', async () => {
//         const { getByText } = render(<Main {...mockProps} />);
//         const showMoreButton = getByText('...');
//         fireEvent.click(showMoreButton);
//         expect(mockGetAllNotes).toHaveBeenCalledTimes(2); // button + useEffect
//     });

//     it('calls logOut when logout button is clicked', () => {
//         const { getByTestId } = render(
//             <Main {...mockProps}/>
//         );
//         fireEvent.click(getByTestId('logout-button'));
//         expect(mockLogOut).toHaveBeenCalledTimes(1);
//     });
// });
