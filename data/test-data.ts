export default class TestData{

    static makeAppointmnetTestData(){
        return [
            {testID:"TC001",facility:"Tokyo CURA Healthcare Center", hcp:"Medicare", visitDt: "05/10/2025"},
            {testID:"TC002",facility:"Hongkong CURA Healthcare Center", hcp:"Medicaid", visitDt: "05/11/2025"},
            {testID:"TC003",facility:"Seoul CURA Healthcare Center", hcp:"None", visitDt: "05/10/2025"},
        ];
    }

    static apiUserCreation(){
        return [
            {
                name: "Alex",
                job: "Thomas",
                id: "129",
                createdAt" "2025-10-06T01:35:49.877Z",

            }
        ];
    }

}