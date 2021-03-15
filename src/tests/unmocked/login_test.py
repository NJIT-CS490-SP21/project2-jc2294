import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../../'))
from app import on_login_test
import models


USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERS_INPUT: {
                   'username': 'user1'
                },
                EXPECTED_OUTPUT: {
                    'X': "user1",
                    'spectators': [],
                }
            },
            {
                USERS_INPUT: {
                    'username': 'user2'
                },
                EXPECTED_OUTPUT: {
                    'X': "user1",
                    'O': "user2",
                    'spectators': [],
                }
            }
            # TODO add another test case
        ]
        
        self.failure_test_params = [
            {
                USERS_INPUT: {
                   'username': 'user1'
                },
                EXPECTED_OUTPUT: {
                    'spectators': ["user1"],
                }
            },
            {
                USERS_INPUT: {
                    'username': 'user2'
                },
                EXPECTED_OUTPUT: {
                    'spectators': ['user1','user2'],
                }
            }
            # TODO add another test case
        ]
        
        self.failure_test_params2 = [
            {
                USERS_INPUT: {
                   'username': 'user1'
                },
                EXPECTED_OUTPUT: {
                    'spectators': ["user1"],
                }
            },
            {
                USERS_INPUT: {
                    'username': 'user2'
                },
                EXPECTED_OUTPUT: {
                    'spectators': [],
                }
            }
            # TODO add another test case
        ]

    def test_add_user(self):
        for test in self.success_test_params:

            actual_result = on_login_test(test[USERS_INPUT])
            
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)
        print(actual_result)
        print(expected_result)
            
    def test_not_add_user(self):
        for test in self.failure_test_params:

            actual_result = on_login_test(test[USERS_INPUT])
            
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]
        

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)
            
    def test_not_add_user2(self):
        for test in self.failure_test_params:

            actual_result = on_login_test(test[USERS_INPUT])
            
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()