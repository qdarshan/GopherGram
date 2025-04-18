package database

import (
	"errors"
	"fmt"
)

var (
	ErrNotFound      = errors.New("resource not found")
	ErrDuplicateUser = errors.New("username or email already exists")
)

type ErrDuplicateEntry struct {
	Type  string
	Field string
	Value string
}

func (e *ErrDuplicateEntry) Error() string {
	return fmt.Sprintf("%s with %s '%s' already exists", e.Type, e.Field, e.Value)
}
