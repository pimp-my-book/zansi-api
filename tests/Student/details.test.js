describe("Student can enter their details", () => {

    test("It is able to create the student object", async () => {
       
        const studentDetails = {
            Item: {
                id: "1",
                studentNumber: 123456,
			    name: "Bruce Wayne",
			    email: "bruce@waynefoundation.com",
			    university: "University of Gotham",
			    degree: "BA: Politics",
			    currentYear: "2nd Year",
			    bursary: "Wayne Foundation",
			    cellNumber: "02154747",
			    address: "23 Wayne Mannor"
            }
        };
       
        expect(studentDetails).not.toBe(null);

    });
    
  
})