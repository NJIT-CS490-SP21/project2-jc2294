'''
    This test will check the login function
    and if the username is added to dictionary once the user logs in  '''
import unittest
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../../'))
from app import on_login_test

USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    ''' test case for update users '''
    def setUp(self):
        self.success_test_params = [{
            USERS_INPUT: {
                'username': 'user1'
            },
            EXPECTED_OUTPUT: {
                'X': "user1",
                'spectators': [],
            }
        }, {
            USERS_INPUT: {
                'username': 'user2'
            },
            EXPECTED_OUTPUT: {
                'X': "user1",
                'O': "user2",
                'spectators': [],
            }
        }
                                    ]

        self.failure_test_params = [{
            USERS_INPUT: {
                'username': 'user1'
            },
            EXPECTED_OUTPUT: {
                'spectators': ["user1"],
            }
        }, {
            USERS_INPUT: {
                'username': 'user2'
            },
            EXPECTED_OUTPUT: {
                'spectators': ['user1', 'user2'],
            }
        }
                                    ]

        self.failure_test_params2 = [{
            USERS_INPUT: {
                'username': 'user1'
            },
            EXPECTED_OUTPUT: {
                'spectators': ["user1"],
            }
        }, {
            USERS_INPUT: {
                'username': 'user2'
            },
            EXPECTED_OUTPUT: {
                'spectators': [],
            }
        }
                                     ]

    def test_add_user(self):
        ''' checks if user is added '''
        for test in self.success_test_params:

            actual_result = on_login_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)

    def test_not_add_user(self):
        ''' checks if user is not added '''
        for test in self.failure_test_params:

            actual_result = on_login_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)

    def test_not_add_user2(self):
        ''' another function that checks if user is not added '''
        for test in self.failure_test_params:

            actual_result = on_login_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
