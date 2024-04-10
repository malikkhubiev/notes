// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import { Note } from './Note';

// describe('Note component', () => {
//   const mockNote = {
//     id: 1,
//     header: 'Test Header',
//     body: 'Test Body',
//     catalog: {
//       id: 1,
//       name: "1",
//       updatedAt: "2024-04-01",
//       userId: 1
//     },
//     date: '2024-04-01',
//     lastDate: new Date(),
//     deleteNote: jest.fn() // mock функция для удаления заметки
//   };

//   it('renders correctly', () => {
//     const { getByText } = render(
//       <MemoryRouter>
//         <Note {...mockNote} />
//       </MemoryRouter>
//     );
//     expect(getByText('Test Header')).toBeInTheDocument();
//     expect(getByText('Test Body')).toBeInTheDocument();
//     expect(getByText('delete')).toBeInTheDocument();
//   });

//   it('calls deleteNote function when delete button is clicked', () => {
//     const { getByText } = render(
//       <MemoryRouter>
//         <Note {...mockNote} />
//       </MemoryRouter>
//     );
//     const deleteButton = getByText('delete');
//     fireEvent.click(deleteButton);
//     expect(mockNote.deleteNote).toHaveBeenCalledWith(1); // Проверяем, что функция deleteNote была вызвана с правильным id
//   });
// });