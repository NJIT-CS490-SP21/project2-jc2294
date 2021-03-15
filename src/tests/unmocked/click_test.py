''' this test will check on click funtion '''
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../../'))
from app import on_click_test
import models

USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"


class ClickTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERS_INPUT: ["X", "X", "O", "O"],
                EXPECTED_OUTPUT: ["X", "X", "O", "O"]
            },
        ]

        self.failure_test_params = [
            {
                USERS_INPUT: ["X", "X", "O", "O"],
                EXPECTED_OUTPUT: [],
            },
        ]

        self.failure_test_params2 = [{
            USERS_INPUT: ["X", "X", "O", "O"],
            EXPECTED_OUTPUT: ["", "", "", ""],
        }
                                     ]

    def test_on_click_test(self):
        for test in self.success_test_params:

            actual_result = on_click_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)

    def test_not_on_click_test(self):
        for test in self.failure_test_params:

            actual_result = on_click_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)

    def test_not_on_click_test2(self):
        for test in self.failure_test_params2:

            actual_result = on_click_test(test[USERS_INPUT])

            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]

            # Use assert checks to see compare values of the results
            self.assertNotEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
