<?php

namespace App\Http\Controllers\Admin;

use App\Services\Admin\AdminService;
use App\Http\Controllers\Controller;
use App\Services\Admin\ProviderService;
use App\Services\Admin\ContactFormService;
use App\Http\Requests\Admin\EditProfileRequest;
use App\Http\Requests\Admin\EditProviderRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdminController extends Controller
{
    public function getProviders()
    {
        try {
            $providers = ProviderService::getAll();

            return $this->messageResponse(true, "Providers retrieved successfully", 200, $providers);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve providers", 500);
        }
    }

    public function editProvider(EditProviderRequest $request, $id)
    {
        try {
            ProviderService::editProfile($id, $request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function getContactMessages()
    {
        try {
            $messages = ContactFormService::getAll();

            return $this->messageResponse(true, "Messages retrieved successfully", 200, $messages);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to retrieve messages", 500);
        }
    }

    public function deleteMessage($id)
    {
        try {
            ContactFormService::delete($id);

            return $this->messageResponse(true, "Message deleted successfully", 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorMessageResponse(false, "ID not Found", $e->getMessage(), 404);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to delete message", 500);
        }
    }

    public function editProfile(EditProfileRequest $request)
    {
        try {
            AdminService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }
}
