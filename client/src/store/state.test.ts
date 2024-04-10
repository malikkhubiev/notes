// import { NoteType } from "../types/main.types";
// import { DateFormatting, generalInLogout, modalCalling } from "./state";
// import state from "./state";

// // Mocking setTimeout
// jest.useFakeTimers();


// describe("modalCalling function", () => {

//   beforeEach(() => {
//     state.modalMessage = "";
//   });

//   it("sets modal message", () => {
//     modalCalling("Test message");
//     expect(state.modalMessage).toBe("Test message");
//   });

//   it("clears modal message after 2500ms", () => {
//     modalCalling("Test message");
//     jest.advanceTimersByTime(2500); // Advance timer by 2500ms
//     expect(state.modalMessage).toBe("");
//   });
// });



// describe('generalInLogout function', () => {
//   afterEach(() => {
//     localStorage.clear();
//     state.isAuth = false;
//   });

//   test('Setting token in localStorage', () => {
//     const token = 'testToken123';
//     generalInLogout(token);
//     expect(localStorage.getItem('token')).toBe(token);
//   });

//   test('Setting isAuth flag in state', () => {
//     const token = 'testToken123';
//     generalInLogout(token);
//     expect(state.isAuth).toBe(true);
//   });

//   test('Handling incorrect token type', () => {
//     const token:any = 123; // Не строка
//     expect(() => {
//       generalInLogout(token);
//     }).toThrow(TypeError);
//   });


//   test('Updating existing token in localStorage', () => {
//     localStorage.setItem('token', 'oldToken');
//     const newToken = 'newToken123';
//     generalInLogout(newToken);
//     expect(localStorage.getItem('token')).toBe(newToken);
//   });
// });




// describe('DateFormatting function', () => {
//     test('Formatting dates correctly', () => {
//         const notes: NoteType[] = [
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '2024-04-01', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '2024-04-02', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '2024-04-03', lastDate: new Date() }
//         ];

//         const formattedNotes = DateFormatting(notes);

//         expect(formattedNotes).toEqual([
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '01.04.2024', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '02.04.2024', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '03.04.2024', lastDate: new Date() }
//         ]);
//     });

//     test('Handling dates with single digit day and month', () => {
//         const notes: NoteType[] = [
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '2024-04-05', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '2024-04-12', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '2024-04-23', lastDate: new Date() }
//         ];

//         const formattedNotes = DateFormatting(notes);

//         expect(formattedNotes).toEqual([
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '05.04.2024', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '12.04.2024', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '23.04.2024', lastDate: new Date() }
//         ]);
//     });

//     test('Handling dates with zero-padded day and month', () => {
//         const notes: NoteType[] = [
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '2024-04-09', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '2024-04-11', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '2024-04-20', lastDate: new Date() }
//         ];

//         const formattedNotes = DateFormatting(notes);

//         expect(formattedNotes).toEqual([
//             { id: 1, header: 'Note 1', body: 'Body 1', date: '09.04.2024', lastDate: new Date() },
//             { id: 2, header: 'Note 2', body: 'Body 2', date: '11.04.2024', lastDate: new Date() },
//             { id: 3, header: 'Note 3', body: 'Body 3', date: '20.04.2024', lastDate: new Date() }
//         ]);
//     });
// });