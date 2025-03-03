// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

package admin_api

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/minio/console/models"
)

// SetAccessRuleWithBucketOKCode is the HTTP code returned for type SetAccessRuleWithBucketOK
const SetAccessRuleWithBucketOKCode int = 200

/*SetAccessRuleWithBucketOK A successful response.

swagger:response setAccessRuleWithBucketOK
*/
type SetAccessRuleWithBucketOK struct {

	/*
	  In: Body
	*/
	Payload bool `json:"body,omitempty"`
}

// NewSetAccessRuleWithBucketOK creates SetAccessRuleWithBucketOK with default headers values
func NewSetAccessRuleWithBucketOK() *SetAccessRuleWithBucketOK {

	return &SetAccessRuleWithBucketOK{}
}

// WithPayload adds the payload to the set access rule with bucket o k response
func (o *SetAccessRuleWithBucketOK) WithPayload(payload bool) *SetAccessRuleWithBucketOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the set access rule with bucket o k response
func (o *SetAccessRuleWithBucketOK) SetPayload(payload bool) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *SetAccessRuleWithBucketOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	payload := o.Payload
	if err := producer.Produce(rw, payload); err != nil {
		panic(err) // let the recovery middleware deal with this
	}
}

/*SetAccessRuleWithBucketDefault Generic error response.

swagger:response setAccessRuleWithBucketDefault
*/
type SetAccessRuleWithBucketDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewSetAccessRuleWithBucketDefault creates SetAccessRuleWithBucketDefault with default headers values
func NewSetAccessRuleWithBucketDefault(code int) *SetAccessRuleWithBucketDefault {
	if code <= 0 {
		code = 500
	}

	return &SetAccessRuleWithBucketDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the set access rule with bucket default response
func (o *SetAccessRuleWithBucketDefault) WithStatusCode(code int) *SetAccessRuleWithBucketDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the set access rule with bucket default response
func (o *SetAccessRuleWithBucketDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the set access rule with bucket default response
func (o *SetAccessRuleWithBucketDefault) WithPayload(payload *models.Error) *SetAccessRuleWithBucketDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the set access rule with bucket default response
func (o *SetAccessRuleWithBucketDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *SetAccessRuleWithBucketDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
