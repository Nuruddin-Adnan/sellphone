import React from 'react';
import rvaDifference from '../../assets/images/Blog/react-vue-angular.jpeg'

const Blog = () => {
    return (
        <section className='py-10 lg:py-20'>
            <div className="container">
                <h2 className='lg:text-4xl font-bold text-3xl text-center mb-10'>Blog Page</h2>
                <div className="grid gap-5 max-w-3xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue"> #Ques: What are the different ways to manage a state in a React application? </h2>
                            <p>
                                When we talk about state in our applications, it’s important to be clear about what types of state actually matter.
                                <br /><br />
                                There are four main types of state you need to properly manage in your React apps:
                            </p>
                            <ul className='list-disc pl-5'>
                                <li> Local state </li>
                                <li> Global state </li>
                                <li> Server state </li>
                                <li> URL state</li>
                            </ul>
                            <p>Let's cover each of these in detail:</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue">#Ques: How does prototypical inheritance work? </h2>
                            <p>
                                The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype. Note: The property of an object that points to its prototype is not called prototype .
                            </p>

                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue">#Ques: What is a unit test? Why should we write unit tests? </h2>
                            <p><strong>Unit Testing</strong></p>
                            <p>Unit testing is testing the smallest testable unit of an application. It is done during the coding phase by the developers. To perform unit testing, a developer writes a piece of code (unit tests) to verify the code to be tested (unit) is correct.</p>

                            <p><strong>Why should we write unit tests</strong></p>
                            <p> Developers write unit tests for their code <strong>to make sure that the code works correctly</strong>. This helps to detect and protect against bugs in the future. Sometimes developers write unit tests first, then write the code. This approach is also known as test-driven development (TDD) </p>

                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue">#Ques: React vs. Angular vs. Vue? </h2>
                            <img src={rvaDifference} alt="blog" />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;