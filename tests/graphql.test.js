import {graphqlHandler} from "../src/graphql";

it('graphqlHandler should be a function', () => {
    expect(typeof graphqlHandler).toBe('function');
});
