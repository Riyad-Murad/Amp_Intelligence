<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EditProfileRequest;
use App\Http\Requests\Admin\EditProviderRequest;
use App\Services\Admin\editProfileService;
use App\Services\Admin\getAllProvidersService;
use App\Services\Admin\DeleteContactMessageService;
use App\Services\Admin\getAllContactMessagesService;
use App\Services\Admin\AdminEditProviderProfileService;

class AdminFunctionsController extends Controller
{
    public function getProviders() {

    }

    public function getContactMessages() {

    }

    public function editProvider(EditProviderRequest $request) {
        try {
            AdminEditProviderProfileService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function editProfile(EditProfileRequest $request) {
        try {
            editProfileService::editProfile($request->validated());

            return $this->messageResponse(true, "Profile updated successfully", 200);
        } catch (\Exception $e) {
            return $this->errorMessageResponse(false, $e->getMessage(), "Failed to update profile", 500);
        }
    }

    public function deleteMessage($id) {

    }
}
