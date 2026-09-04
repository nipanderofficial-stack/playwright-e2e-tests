import {test,expect} from "@playwright/test"

test.beforeAll("Before All Hook- project level", () => {
    console.log("-------Project level: Before All Hook-----------");
});

test.beforeEach("Before Each hook-Project level",()=>{
    console.log("-------Project level: Before Each Hook-----------");
});

test.describe("Test Suite-1",()=>{
    test.beforeAll("Before All Hook-Describe level-1",()=>{
        console.log("-------TestSuite-1 level: Before All Hook-----------");
    });

    test.beforeEach("Before Each hook-Describe Level-1",()=>{
        console.log("-------TestSuite-1 level: Before Each Hook-----------");
    });

    test("TestSuite-1 Test-1",()=>{
        console.log("-------TestSuite-1 level: Test1 -----------");
    });

    test("TestSuite-1 Test-2",()=>{
        console.log("-------TestSuite-1 level: Test2 -----------");
    });

});

test.describe("Test Suite-2",()=>{
    test.beforeAll("Before All Hook-Describe level-2",()=>{
        console.log("-------TestSuite-2 level: Before All Hook-----------");
    });

    test.beforeEach("Before Each hook-Describe Level-1",()=>{
        console.log("-------TestSuite-2 level: Before Each Hook-----------");
    });

    test("TestSuite-2 Test-1",()=>{
        console.log("-------TestSuite-2 level: Test1 -----------");
    });

    test("TestSuite-2 Test-2",()=>{
        console.log("-------TestSuite-2 level: Test2 -----------");
    });

});